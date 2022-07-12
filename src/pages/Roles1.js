import React from "react";
import { Col, Row, Form, Button, Container } from '@themesberg/react-bootstrap';
import { Checkbox, FormControlLabel, Box } from '@mui/material';

export default () => {

    const [checked, setChecked] = React.useState([false, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Child 1"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
        name="child1"
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
        name="child2"
      />
    </Box>
  );

  const handleSubmit = async (e, actions) => {
    e.preventDefault();
    var data = new FormData(e.target);
    let formObject = Object.fromEntries(data.entries());
    console.log('formObject',formObject);
    // setIsSubmit(true);
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
          </p>
          <Row className="justify-content-center form-bg-image" >
            <Col xs={12} className="d-flex align-items-center justify-content-center">
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <FormControlLabel
                    label="Parent"
                    control={
                      <Checkbox
                        checked={checked[0] && checked[1]}
                        indeterminate={checked[0] !== checked[1]}
                        onChange={handleChange1}
                      />
                    }
                    name="parent1"
                  />
                  {children}
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}

