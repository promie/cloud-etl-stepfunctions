import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'

export type CloudETLStepFunctionsStackProps = StackProps & {
    appName: string
    stage: string
}

export class CloudETLStepFunctionsStack extends Stack {
    public readonly apiUrl: string

    constructor(scope: Construct, id: string, props: CloudETLStepFunctionsStackProps) {
        super(scope, id, props)

        const { appName, stage } = props
    }
}