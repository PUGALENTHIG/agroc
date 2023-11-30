import { Request, Response } from 'express';
import { ReportServiceImpl } from '../services/master/impl/reports-service-impl';

const reportServiceImpl = new ReportServiceImpl();

export const getEmployeeAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeAttendanceReport = await reportServiceImpl.generateEmployeeAttendanceReport();

    const formattedReport = employeeAttendanceReport.map((report) => {
      return {
        date: report.date.toISOString().split('T')[0],
        numberOfWorkers: report.numberOfWorkers,
      };
    });

    res.json(formattedReport);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employee attendance report' });
  }
};

export const getMonthlyCropReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const monthlyCropReport = await reportServiceImpl.generateMonthlyCropReport();

    // Process the monthlyCropReport if needed...
    
    res.json(monthlyCropReport);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate monthly crop report' });
  }
};

export const getOtherCostYieldReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const otherCostYieldReport = await reportServiceImpl.generateOtherCostYieldReport();
    res.json(otherCostYieldReport);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Other Cost / Yield report' });
  }
};