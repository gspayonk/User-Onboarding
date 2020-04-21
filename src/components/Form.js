import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ errors, touched, values, status }) => {
    
    
    const [users, setUser] = useState ([]);
    useEffect (() =>{
        if (status){
            setUser([status]);
        }
    }, [status]);

    return (
        <div className = 'user-form'>
            <h1>User Onboarding</h1>
            <Form>

            <Field type="text" name="name" placeholder="Your Name" />
        {touched.name && errors.name && (
            <p className="error">{errors.name}</p>
        )}

        <Field type="text" name="email" placeholder="Your E-mail" />
        {touched.email && errors.email && <p className="error">{errors.email}</p>}

        <Field type="text" name="password" placeholder="Your password" />
        {touched.email && errors.email && <p className="error">{errors.password}</p>}

        <label className="checkbox-container">
            Terms of Service
            <Field
            type="checkbox"
            name="terms"
            checked={values.terms}
            />
        <span className="check-mark" />
        </label>
        {touched.terms && errors.terms && <p className="error">{errors.terms}</p>}

        <button type="submit">Submit!</button>
    </Form>

    {users.map(user => (
        <ul key={user.id}>
            <li>Species: {user.name}</li>
            <li>Size: {user.email}</li>
            <li>Password: {user.password}</li>
        
        </ul>
    ))}

        </div>
    );
    };


    const FormikUserForm = withFormik({
        
        mapPropsToValues({ name, email, password, terms }) {
        return {
            terms: terms || false,
            name: name || "",
            email: email || "",
            password: password || "",
            
        };
        },

        validationSchema: Yup.object().shape({
            name: Yup.string().required("Your name!"),
            email: Yup.string().required(),
            password: Yup.string(),
            terms: Yup.string().required('You must accept our Terms and Conditions to submit!'),
        
        }),
    
        handleSubmit(values, { setStatus }) {
        axios
        
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                setStatus(res.data);
                console.log(res);
            })
            .catch(err => console.log(err.response));
        }
    })(UserForm); 
        console.log("This is the HOC", FormikUserForm);

    export default FormikUserForm;