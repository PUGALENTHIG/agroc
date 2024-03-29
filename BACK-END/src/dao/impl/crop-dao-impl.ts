import { getConnection, Like } from "typeorm";
import { CropDto } from "../../dto/master/crop-dto";
import { Status } from "../../enum/Status";
import { CropEntity } from "../../entity/master/crop-entity";
import { CropDao } from "../crop-dao";
import { LandEntity } from "../../entity/master/land-entity";

/**
 * department data access layer
 * contain crud method
 */
export class CropDaoImpl implements CropDao {
  async save(cropDto: CropDto, landModel:LandEntity): Promise<CropEntity> {
    let cropRepo = getConnection().getRepository(CropEntity);
    let cropModel = new CropEntity();

    this.preparecropModel(cropModel, cropDto);
    let savedDept = await cropRepo.save(cropModel);
    return savedDept;
  }
  async update(cropDto: CropDto): Promise<CropEntity> {
    let cropRepo = getConnection().getRepository(CropEntity);
    let cropModel = await cropRepo.findOne(cropDto.getCropId());
    if (cropModel) {
      this.preparecropModel(cropModel, cropDto);
      let updatedModel = await cropRepo.save(cropModel);
      return updatedModel;
    } else {
      return null;
    }
  }
  async delete(cropDto: CropDto): Promise<CropEntity> {
    let cropRepo = getConnection().getRepository(CropEntity);
    let cropModel = await cropRepo.findOne({where: { id: cropDto.getCropId() }});
    if (cropModel) {
      cropModel.status = Status.Offline;
      let updatedModel = await cropRepo.save(cropModel);
      return updatedModel;
    } else {
      return null;
    }
  }
  async findAll(cropDto: CropDto): Promise<CropEntity[]> {
    let cropRepo = getConnection().getRepository(CropEntity);
    let searchObject: any = this.prepareSearchObject(cropDto);
    let cropModel = await cropRepo.find({
      where: searchObject,
      skip: cropDto.getStartIndex(),
      take: cropDto.getMaxResult(),
      order:{id:"DESC"}
    });
    return cropModel;
  }
  async findCount(cropDto: CropDto): Promise<number> {
    let cropRepo = getConnection().getRepository(CropEntity);
    let searchObject: any = this.prepareSearchObject(cropDto);
    let cropModel = await cropRepo.count({ where: searchObject });
    return cropModel;
  }
  async findById(cropId: number): Promise<CropEntity> {
    let cropRepo = getConnection().getRepository(CropEntity);
    let cropModel = await cropRepo.findOne(cropId);
    return cropModel;
  }

  async findByName(name: String): Promise<CropEntity> {
    let cropRepo = getConnection().getRepository(CropEntity);
    let cropModel = await cropRepo.findOne({ where: { name: name, status: Status.Online } });
    return cropModel;
  }

  // async findCropIdByLandId(landId: number): Promise<number | null> {
  //   let cropRepo = getConnection().getRepository(CropEntity);
  //   let cropModel = await cropRepo.findOne({
  //     where: { land: landId, status: Status.Online },
  //   });
  
  //   if (cropModel) {
  //     return cropModel.id;
  //   }
  
  //   return null;
  // }

  async findCropNameByLandId(landId: number): Promise<string | null> {
    let cropRepo = getConnection().getRepository(CropEntity);
    let cropModel = await cropRepo.findOne({
      where: { land: landId, status: Status.Online },
    });
  
    if (cropModel) {
      return cropModel.cropName;
    }
  
    return null;
  }
  
  async preparecropModel(cropModel: CropEntity, cropDto: CropDto) {
    cropModel.cropName = cropDto.getCropName();
    cropModel.createdDate = new Date();
    cropModel.updatedDate = new Date();
    cropModel.status = Status.Online;
  }
  prepareSearchObject(cropDto: CropDto): any {
    let searchObject: any = {};
    if (cropDto.getCropName()) {
      searchObject.name = Like("%" + cropDto.getCropName() + "%");
    }
  
    
    searchObject.status = Status.Online;
  
    return searchObject;
  }
}
