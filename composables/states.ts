const { data: lastNumberData } = await useFetch(
  'https://promenadesapi-production.up.railway.app/promenade/findLastPromenade'
)

export const useLastPromenade = () =>
  useState('lastPromenade', () => lastNumberData.value)
