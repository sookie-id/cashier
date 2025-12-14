# Supabase data type generation
## Non-public schema usage
### Tables type not properly setup
Accessing table type as follow will not work
```
type FetchVariantAttributesReturn = Tables<"variant_attributes">[]
```

**Cause:** Generated non-public schema data type has the type DefaultSchema pointing to public

**Fix:** Manually change type DefaultSchema to intended schema

### Return type not properly setup
On creating client, specifying the schema in the option like follow is not enough.
```
export const databaseClient = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    db: {
      schema: "product" as any,
    },
  }
);
```

It will result in this `data` to have type of `any[] | null`
```
const { data } = await databaseClient
  .from("variant_attributes")
  .select();
```

**Cause:** Somehow the SDK still looking for the return type in public schema

**Fix:** Specify schema explicitly with the function `schema` like follow
```
export const databaseClient = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    db: {
      schema: "product" as any,
    },
  }
).schema("product");
```