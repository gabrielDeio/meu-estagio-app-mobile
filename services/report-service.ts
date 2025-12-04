import { Directory, File, Paths } from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { api } from './api'
import { getAllActivitiesDto } from '../src/dto/activity.dto'

interface generateReportDto extends getAllActivitiesDto {}

export class ReportService {
  static async generateReport(payload: generateReportDto) {
    const { userId, orgId, initialDate, endDate } = payload

    try {
      const pdfDirectory = new Directory(Paths.cache, 'pdfs')
      const exists = pdfDirectory.exists
      if (!exists) {
        pdfDirectory.create()
      }

      const fileName = `relatorio_${orgId}_${Date.now()}.pdf`
      const pdfFile = new File(pdfDirectory, fileName)

      const queryParams = {
        start_date: new Date(initialDate).toISOString(),
        end_date: new Date(endDate).toISOString(),
      }

      const response = await api.get(`/report/org/${orgId}/user/${userId}/generate`, {
        responseType: 'arraybuffer',
        params: queryParams,
      })

      const pdfBytes = new Uint8Array(response.data)

      await pdfFile.write(pdfBytes)

      console.log('PDF salvo em:', pdfFile.uri)

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(pdfFile.uri, {
          mimeType: 'application/pdf',
        })
      }

      return pdfFile.uri
    } catch (err) {
      console.error('Erro ao gerar relatório', err)
      throw err
    }
  }
}
