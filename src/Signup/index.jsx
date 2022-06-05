import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

const Input = (props) => (
    <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-white" />
)

const validationSchema = yup.object({
    name: yup.string().required("Digite seu nome"),
    username: yup.string().required("Digite seu username"),
    email: yup.string().required("Digite seu email").email('E-mail inválido'),
    password: yup.string().required("Digite sua senha")
})

export function Signup({ signInUser }) {
    const formik = useFormik({
        onSubmit: async (values) => {
            const res = await axios.post('http://localhost:9901/signup', {
                name: values.name,
                username: values.username,
                email: values.email,
                password: values.password
            }
            )
            signInUser(res.data)
        },
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: ''
        },
        validationSchema,
        validateOnMount: true,
    })
    return (
        <div className="flex flex-col h-full justify-center p-12 space-y-6">
            <h1 className="text-3xl text-white">Crie sua conta</h1>
            <form className="space-y-6" onSubmit={formik.handleSubmit} >
                <div className="space-y-2">
                    <Input
                        name="name"
                        placeholder="name"
                        value={formik.values.name}
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                    />
                    {(formik.touched.name && formik.errors.name) && (<div className="text-red-500 text-sm">{formik.errors.name}</div>)}
                </div>
                <div className="space-y-2">
                    <Input
                        name="username"
                        placeholder="username"
                        value={formik.values.username}
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                    />
                    {(formik.touched.username && formik.errors.username) && (<div className="text-red-500 text-sm">{formik.errors.username}</div>)}
                </div>



                <div className="space-y-2">
                    <Input
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                    />
                    {(formik.touched.email && formik.errors.email) && (<div className="text-red-500 text-sm">{formik.errors.email}</div>)}
                </div>
                <div className="space-y-2">
                    <Input name="password"
                        placeholder="Senha"
                        value={formik.values.password}
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                    />
                    {(formik.touched.password && formik.errors.password) && (<div className="text-red-500 text-sm">{formik.errors.password}</div>)}
                </div>
                <button
                    className="bg-birdBlue py-4 rounded-full disabled:opacity-50 w-full text-lg"
                    disabled={!formik.isValid || formik.isSubmitting}
                    type="submit"
                >{formik.isSubmitting ? 'Enviando ' : 'Cadastrar'}</button>
            </form>
            <span className="text-sm text-silver text-center">Já tem conta? <a className="text-birdBlue" href="/login">Acesse</a></span>
        </div>
    )
}