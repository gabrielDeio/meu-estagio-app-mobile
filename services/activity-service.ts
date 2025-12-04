import {
  Activity,
  ActivityStatus,
  createActivityDto,
  getAllActivitiesDto,
} from '../src/dto/activity.dto'
import { api } from './api'

export class ActivityService {
  static async getAllActivities(payload: getAllActivitiesDto): Promise<Array<Activity>> {
    const { userId, orgId, initialDate, endDate } = payload
    if (!payload.initialDate && !payload.endDate) {
      const response = await api.get(`/activity/${orgId}/user/${userId}`)

      return response.data
    }
    const queryParams = {
      initial_date: initialDate !== '' ? new Date(initialDate).toISOString() : undefined,
      end_date: endDate !== '' ? new Date(endDate).toISOString() : undefined,
    }

    if (!queryParams.initial_date) delete queryParams.initial_date
    if (!queryParams.end_date) delete queryParams.end_date

    const response = await api.get(`/activity/${orgId}/user/${userId}`, { params: queryParams })

    return response.data
  }

  static async registerActivity(payload: createActivityDto) {
    const response = await api.post('/activity/', payload)

    return response
  }

  static async setActivityStatus(status: ActivityStatus, activityId: string) {
    const response = await api.patch(`/activity/${activityId}`, { status })

    return response
  }
}
