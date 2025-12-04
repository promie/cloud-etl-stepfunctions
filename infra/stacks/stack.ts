import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { CustomerTableConstruct } from './constructs/storage/customerTable.construct'
import { AuthenticationConstruct } from './constructs/auth/authentication.construct'

export type CloudETLStepFunctionsStackProps = StackProps & {
  appName: string
  stage: string
}

export class CloudETLStepFunctionsStack extends Stack {
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

    const authentication = new AuthenticationConstruct(this, 'Authentication', {
      appName,
      stage,
    })
  }
}
