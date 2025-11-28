export enum ActivityStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface Activity {
  id: string
  organization_id: string
  user_id: string
  name: string
  description: string
  status: ActivityStatus
  start_time: string
  end_time: string
  approved_by?: string
}

export interface getAllActivitiesDto {
  userId: string
  orgId: string
}

export interface createActivityDto {
  name: string
  description: string
  start_time: string
  end_time: string
  user_id: string
  org_id: string
}
