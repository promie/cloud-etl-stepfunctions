import { RemovalPolicy } from 'aws-cdk-lib'
import {
    AttributeType,
    BillingMode,
    Table,
    TableEncryption,
} from 'aws-cdk-lib/aws-dynamodb'
import { Construct } from 'constructs'

export interface CustomerTableConstructProps {
    appName: string
    stage: string
}

export class CustomerTableConstruct extends Construct {
    public readonly table: Table

    constructor(scope: Construct, id: string, props: CustomerTableConstructProps) {
        super(scope, id)

        const { appName, stage } = props

        this.table = new Table(this, 'CustomerTable', {
            tableName: `${appName}-${stage}-customers`,
            partitionKey: {
                name: 'customerId',
                type: AttributeType.STRING,
            },
            billingMode: BillingMode.PAY_PER_REQUEST,
            encryption: TableEncryption.AWS_MANAGED,
            pointInTimeRecovery: true,
            removalPolicy:
                stage === 'production' ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
        })

        // GSI for email lookups (optional but good practice based on schema)
        this.table.addGlobalSecondaryIndex({
            indexName: 'email-index',
            partitionKey: {
                name: 'email',
                type: AttributeType.STRING,
            },
        })
    }
}
