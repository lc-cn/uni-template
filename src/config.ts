const runtimeEnv=uni.getAccountInfoSync().miniProgram.envVersion
const config = {
    baseURL: import.meta.env[`VITE_${runtimeEnv.toUpperCase()}_BASE_URL`],
}
export const baseURL = config.baseURL
export default config
