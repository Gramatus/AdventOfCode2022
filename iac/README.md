# Init Terraform

```shell
terraform init -backend-config="storage_account_name=gnistportal" -backend-config="key=gramatus.terraform.tfstate"
```

# DB connect

export PGUSER=torgeir_gramatusweb.onmicrosoft.com#EXT#@250r0z.onmicrosoft.com
export PGPASSWORD=$(az account get-access-token --resource-type oss-rdbms --query "[accessToken]" -o tsv)
psql "host=torgst-gnist-test-flexible.postgres.database.azure.com dbname=postgres sslmode=require"
