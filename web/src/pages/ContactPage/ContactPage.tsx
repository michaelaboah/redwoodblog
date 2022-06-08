import { FieldError, Form, FormError, Label, Submit, SubmitHandler, TextAreaField, TextField, useForm } from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { CreateContactInput, MutationcreateContactArgs } from 'types/graphql'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

interface FormValues {
  name: string
  email: string
  message: string
}


const ContactPage = () => {
  const [create, { loading, error }] = useMutation<CreateContactInput, MutationcreateContactArgs>(
    CREATE_CONTACT, {
      onCompleted: () => { 
        toast.success(" Success! "),
        formMethods.reset()
      }}
    )
  const formMethods = useForm({mode: "onBlur"})
  const submit: SubmitHandler<FormValues> = (data) => {
    create({variables: {input: data}})
  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />
      <Toaster/>
      <Form onSubmit={submit} config={{ mode: 'onBlur' }} error={error}>
        <FormError error={error} wrapperClassName="form-error" />
        <Label name='name' errorClassName='error'>Name</Label>
        <TextField
          errorClassName='error' 
          name='name' 
          validation={{required: true}}
          />
        <FieldError name='name' className='error'/>

        <Label name="email" errorClassName='error'>Email</Label>
        <TextField
          errorClassName='error' 
          name='email' 
          validation={{
              required: true,
              pattern: {
                value: /^[^@]+@[^.]+\..+$/,
                message: 'Please enter a valid email address',
              },
            }}
          />
        <FieldError name='email' className='error'/>

        <Label name="message" errorClassName='error'>Message</Label>
        <TextAreaField
          errorClassName='error' 
          name='message' 
          validation={{required: true}}
          />
        <FieldError name='message' className='error'/>

        <Submit disabled={loading}>Save</Submit>
      </Form>
    </>
  )
}

export default ContactPage
