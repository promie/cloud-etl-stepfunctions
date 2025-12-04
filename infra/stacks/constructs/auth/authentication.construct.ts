import { Resource } from 'aws-cdk-lib/aws-apigateway'
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito'
import { Table } from 'aws-cdk-lib/aws-dynamodb'
import { Construct } from 'constructs'
import { CognitoConstruct } from './cognito.construct'

export interface AuthenticationConstructProps {
    appName: string
    stage: string
    authResource: Resource
}

export class AuthenticationConstruct extends Construct {
    public readonly userPool: UserPool
    public readonly userPoolClient: UserPoolClient
    public readonly userTable: Table

    constructor(
        scope: Construct,
        id: string,
        props: AuthenticationConstructProps,
    ) {
        super(scope, id)

        const { appName, stage, authResource } = props

        const cognito = new CognitoConstruct(this, 'Cognito', {
            appName,
            stage,
        })

        this.userPool = cognito.userPool
        this.userPoolClient = cognito.userPoolClient

    }
}