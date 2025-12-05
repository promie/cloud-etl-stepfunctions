import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { CustomerTableConstruct } from './constructs/storage/customerTable.construct'
import { AuthenticationConstruct } from './constructs/auth/authentication.construct'
import { ApiGatewayConstruct } from './constructs/api/apiGateway.construct'

export type CloudETLStepFunctionsStackProps = StackProps & {
  appName: string
  stage: string
}

export class CloudETLStepFunctionsStack extends Stack {
  public readonly apiUrl: string

  constructor(
    scope: Construct,
    id: string,
    props: CloudETLStepFunctionsStackProps,
  ) {
    super(scope, id, props)

    const { appName, stage } = props

    const { table } = new CustomerTableConstruct(this, 'CustomerTable', {
      appName,
      stage,
    })

    const apiGateway = new ApiGatewayConstruct(this, 'ApiGateway', {
      appName,
      stage,
    })
    this.apiUrl = apiGateway.apiUrl

    const authResource = apiGateway.api.root.addResource('auth')
    const authentication = new AuthenticationConstruct(this, 'Authentication', {
      appName,
      stage,
      authResource,
    })

    new CfnOutput(this, 'UserPoolId', {
      value: authentication.userPool.userPoolId,
    })
    new CfnOutput(this, 'UserPoolClientId', {
      value: authentication.userPoolClient.userPoolClientId,
    })
    new CfnOutput(this, 'ApiUrl', {
      value: apiGateway.apiUrl,
    })
  }
}
