import { FieldError, Form, Label, Submit, SubmitHandler, TextAreaField, TextField } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'



interface FormValues {
  name: string
  email: string
  message: string
}


const ContactPage = () => {

  const submit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Form onSubmit={submit} config={{ mode: "onBlur"}}>
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

        <Submit>Save</Submit>
      </Form>
    </>
  )
}

export default ContactPage
