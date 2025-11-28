import { api } from './api'

export class OrganizationService {
  static async getOrgSupervisor(orgId: string) {
    const response = await api.get(`/organization/${orgId}/supervisor`)

    return response.data
  }
}
