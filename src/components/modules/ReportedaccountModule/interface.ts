export interface DetailReportedProps {
  username: string
  totalReports: number
  listReports: ReportProps[]
}

export interface ReportProps {
  id: number
  information: string
  dateReport: string
}

export interface ParamProps {
  username: string
}
