import React from 'react';
import { Formik } from 'formik';
import { T } from '@deity/falcon-i18n';
import { H1, Box, FlexLayout, Button } from '@deity/falcon-ui';
import { FormField, Form, FormErrorSummary, CustomerQuery, EditCustomerMutation } from '@deity/falcon-ecommerce-uikit';

const PersonalInformation = () => (
  <Box>
    <H1>Personal Information</H1>
    <CustomerQuery>
      {({ customer }) => (
        <EditCustomerMutation>
          {(editCustomer, { loading, error }) => (
            <Formik
              initialValues={{
                firstname: customer.firstname,
                lastname: customer.lastname,
                email: customer.email
              }}
              onSubmit={values =>
                editCustomer({
                  variables: {
                    input: {
                      websiteId: customer.websiteId,
                      firstname: values.firstname,
                      lastname: values.lastname,
                      email: values.email
                    }
                  }
                })
              }
            >
              {() => (
                <Form id="edit-customer" i18nId="editCustomer">
                  <FormField name="firstname" />
                  <FormField name="lastname" />
                  <FormField name="email" />
                  <FlexLayout justifyContent="space-between" alignItems="center" mt="md">
                    <Button type="submit" variant={loading ? 'loader' : undefined}>
                      <T id="editCustomer.submitButton" />
                    </Button>
                  </FlexLayout>
                  <FormErrorSummary errors={error && [error.message]} />
                </Form>
              )}
            </Formik>
          )}
        </EditCustomerMutation>
      )}
    </CustomerQuery>
  </Box>
);

export default PersonalInformation;
