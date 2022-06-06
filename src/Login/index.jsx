import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

const Input = (props) => (
    <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-white" />
)

const validationSchema = yup.object({
    email: yup.string().required("Digite seu email").email('E-mail inválido'),
    password: yup.string().required("Digite sua senha")
})

export function Login({ signInUser }) {
    const formik = useFormik({
        onSubmit: async (values) => {
            const res = await axios.get(`${import.meta.env.VITE_API_HOST}/login`, {
                auth: {
                    username: values.email,
                    password: values.password
                }
            })
            signInUser(res.data)
        },
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        validateOnMount: true,
    })
    return (
        <div className="h-full flex justify-center">
            <div className="bg-birdBlue md:flex-1"></div>
            <div className="flex-1 flex items-center justify-center p-12 space-y-6 ">
                <div className="max-w-md flex-1">

                    <h1 className="text-3xl text-white">Acesse sua conta</h1>
                    <form className="space-y-6" onSubmit={formik.handleSubmit} >
                        <div className="space-y-2">
                            <Input
                                name="email"
                                placeholder="E-mail"
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
                        >{formik.isSubmitting ? 'Enviando ' : 'Entrar'}</button>
                    </form>
                    <span className="text-sm text-silver text-center">Não tem conta? <a className="text-birdBlue" href="/signup">Inscreva-se</a></span>
                </div>
            </div>
        </div>
    )
}