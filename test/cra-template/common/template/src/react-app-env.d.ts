/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test'
        REACT_APP_TEMPLATE: 'js' | 'ts'
        REACT_APP_SANDBOX_DEPLOYED?: 'true' | 'false'
    }
}