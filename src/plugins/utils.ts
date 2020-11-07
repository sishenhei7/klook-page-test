export const getTimeFromPerformanceMetrics = (metrics: any, name: string) =>
  metrics.metrics.find((x: any) => x.name === name).value * 1000

export const extractDataFromPerformanceMetrics = (metrics: any, ...dataNames: string[]) => {
  const navigationStart = getTimeFromPerformanceMetrics(metrics, 'NavigationStart')

  const extractedData = {} as any

  dataNames.forEach(name => {
    extractedData[name] = getTimeFromPerformanceMetrics(metrics, name) - navigationStart
  })

  return extractedData
}
