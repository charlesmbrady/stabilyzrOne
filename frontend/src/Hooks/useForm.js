import { useContext, useEffect } from 'react';
import { FormValuesContext } from '../Contexts/FormValuesContext';
import { UserContext } from '../Contexts/UserContext';
import { FormErrorsContext } from '../Contexts/FormErrorsContext';
import { GlobalContext } from '../Contexts/GlobalContext';
import API from '../Utilities/API';
import validate from '../Utilities/formValidations';
import { Redirect } from 'react-router-dom';

const useForm = (callback) => {
  const { formValues, setFormValues } = useContext(FormValuesContext);
  const { formErrors, setFormErrors } = useContext(FormErrorsContext);
  const { user, setUser } = useContext(UserContext);
  const { global, setGlobal } = useContext(GlobalContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setGlobal({ ...global, isSubmitting: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const clearForm = () => {
    setGlobal({ ...global, isSubmitting: false });
    let tempValues = { ...formValues };
    // let tempErrors = { ...formErrors };

    // for each key in the form values array, set the value to null
    for (let [key, value] of Object.entries(tempValues)) {
      tempValues[key] = null;
    }
    setFormValues({});

    // for each key in the form errors array, set the value to null
    // for (let [key, value] of Object.entries(tempErrors)) {
    //   tempErrors[key] = null;
    // }
    setFormErrors({});
  };

  const executeCallback = (callbackName) => {
    switch (callbackName) {
      case 'authenticateUser':
        authenticateUser();
        break;
      case 'registerUser':
        registerUser();
        break;

      case 'createProject':
        createProject();
        break;
    }
  };
  const createProject = () => {
    if (formErrors.projectName) {
      return 0;
    }
    API.createProject({
      name: formValues.projectName,
    }).then((res) => {
      if (res.status === 200) {
        // redirect to homepage here
        clearForm();
        setUser({ ...user, isAuthenticated: true });
      }
    });
  };
  const authenticateUser = () => {
    if (formErrors.email || formErrors.password) {
      return 0;
    }
    API.authenticate({
      email: formValues.email,
      password: formValues.password,
    }).then((res) => {
      if (res.status === 200) {
        clearForm();
        setUser({ ...user, isAuthenticated: true });
      }
    });
  };

  const registerUser = () => {
    if (
      formErrors.firstName ||
      formErrors.lastName ||
      formErrors.email ||
      formErrors.password ||
      formErrors.passwordConfirmation
    ) {
      return 0;
    }
    API.createUser({
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      passwordConfirmation: formValues.passwordConfirmation,
    }).then((res) => {
      if (res.status === 200) {
        clearForm();
        setUser({ ...user, isCreated: true });
      }
    });
  };

  useEffect(() => {
    // check to see if there are errors
    // if not, call our callback
    if (global.isSubmitting) {
      executeCallback(callback);
    }
  }, [formErrors]);

  return {
    handleChange,
    handleSubmit,
    clearForm,
    formValues,
    formErrors,
    authenticateUser,
    registerUser,
  };
};

export default useForm;
