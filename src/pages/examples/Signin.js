
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
// import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, Alert } from '@themesberg/react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { RoutesPage } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import loginController from "../../controller/login/loginController"
import dashboardController from "../../controller/dashboard/dashboardController";
import loggers from "../../utils/loggers";
import actionCreators from "../../redux_state/index";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux"
import common_function from "../../utils/common_function";
import util from "../../utils/util";


export default () => {
  const dispatch = useDispatch()
  const reduxActions = bindActionCreators(actionCreators, dispatch)

  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [ errorSuccessMsg, setErrorSuccessMsg ] = useState({ flag: false, message: '', type: '' })

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value })
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e, actions) => {
    e.preventDefault();
    var data = new FormData(e.target);
    let formObject = Object.fromEntries(data.entries());
    loggers.logs('Signin.js', 'handleSubmit', 'formObject', JSON.stringify(formObject))

    const validateForm = await validate(formObject);
    if (Object.keys(validateForm).length < 1) {
      const formSubmitValidation = await loginController.formSubmitValidation(formObject, actions)
      if (formSubmitValidation.status === 200) {
        const userDetailsCookies = common_function.getCookies(util.localStorageUserDetails)
        if (userDetailsCookies) {
          const getUserpermission = await dashboardController.getUserpermission()
          if (getUserpermission.status === 200) reduxActions.userPermissions(getUserpermission.data)
        }
        navigate('/dashboard/overview', { replace: true })
      }
      setErrorSuccessMsg({ flag: true, message: formSubmitValidation.message, type: formSubmitValidation.status === 200 ? 'success' : 'danger' })
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  const onClose = () => {
    setErrorSuccessMsg({ flag: false, message: '', type: '' })
  }
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={RoutesPage.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                {
                  errorSuccessMsg.flag ?
                  <React.Fragment>
                      <Alert
                          variant={errorSuccessMsg.type}>
                          <div className="d-flex justify-content-between">
                          <div>
                              <strong>{errorSuccessMsg.message}</strong>
                          </div>
                          <Button variant="close" size="xs" onClick={() => onClose("danger")} />
                          </div>
                      </Alert>
                  </React.Fragment> :
                  <></>
                }
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="email" name="email" placeholder="example@company.com" value={formValues.email} onChange={handleChange} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange} />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">Lost password?</Card.Link>
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
