export const wait = async (delay: number): Promise<void> => (
  await new Promise(resolve => setTimeout(resolve, delay))
)
