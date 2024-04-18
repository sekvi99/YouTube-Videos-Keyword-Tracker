export interface IReportDetail {
  id: number;
  raportId: number;
  videoTitle?: string;
  videoUrl?: string;
  views?: number;
  commentsCount?: number;
  publishedAt?: Date | string | null;
  duration?: string;
  channelTitle?: string;
}

export interface IReportDetails {
  id: number;
  fileId: number;
  raportReadouts: IReportDetail[];
}
