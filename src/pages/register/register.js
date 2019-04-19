import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from "react-router-dom";
import { app } from "../../config/base.js";

const FormItem = Form.Item
class Register extends Component {
    registerHandler = () => {
      this.props.form.validateFields((err, values) => {
        console.log(values)
            if (!err) {
          if (values.ps === values.cn) {
            const { em, ps, un } = values

                    app
              .auth()
              .createUserWithEmailAndPassword(em, ps)
              .then(() => {
                this.user = app.auth().currentUser
                            if (this.user) {
                  this.user
                    .updateProfile({
                      displayName: un,
                    })
                    .then(() => {
                      this.user
                        .sendEmailVerification()
                        .catch(err => console.log(err))
                                    })
                    .catch(err => console.log(err))
                            }
              })
              .catch(err => console.log(err))
                }
        }
      })
    };

    componentWillMount() {
      // this.match = base.syncState(`users`,{
      //   context: this,
      //   state:
      // })
    }

    render() {
      const { form } = this.props
        const { getFieldDecorator } = form
        return (
          <div>
              <Form style={{ width: 350 }} className="mx-auto pt-5">
                  <FormItem
                      className="mb-0"
                      required
                      label="Your Fullname"
                      colon={false}
                    >
                      {getFieldDecorator('fn', {
                          rules: [
                            {
                              required: true,
                              message: 'This field is required',
                              whitespace: true,
                            },
                          ],
                        })(<Input placeholder="Enter Your Fullname" />)}
                    </FormItem>
                  <FormItem
                      className="mb-0"
                      required
                      label="Your Username"
                      colon={false}
                    >
                      {getFieldDecorator('un', {
                          rules: [
                            {
                              required: true,
                              message: 'This field is required',
                              whitespace: true,
                            },
                          ],
                        })(<Input placeholder="Enter Your Username" />)}
                    </FormItem>
                  <FormItem
                      className="mb-0"
                      required
                      label="Your Email"
                      colon={false}
                    >
                      {getFieldDecorator('em', {
                          rules: [
                            {
                              required: true,
                              message: 'This field is required',
                              whitespace: true,
                            },
                            { type: 'email', message: 'Must be a valid email address' },
                          ],
                        })(<Input placeholder="Enter Your Email" type="email" />)}
                    </FormItem>
                  <FormItem
                      className="mb-0"
                      required
                      label="Your Password"
                      colon={false}
                    >
                      {getFieldDecorator('ps', {
                          rules: [
                            {
                              required: true,
                              message: 'This field is required',
                              whitespace: true,
                            },
                          ],
                        })(<Input placeholder="Enter Your Password" type="password" />)}
                    </FormItem>
                  <FormItem
                      required
                      label="Confirm Your Password"
                      colon={false}
                    >
                      {getFieldDecorator('cn', {
                          rules: [
                            {
                              required: true,
                              message: 'This field is required',
                              whitespace: true,
                            },
                          ],
                        })(
                          <Input placeholder="Confirm Your Password" type="password" />,
                        )}
                    </FormItem>
                  <FormItem>
                      <Button
                          type="primary"
                          className="w-100"
                          onClick={this.registerHandler}
                        >
                            Register
                        </Button>
                    </FormItem>
                  <p>
                      <Link to="/login">login now</Link>
                    </p>
                </Form>
            </div>
      )
    }
}

export default Form.create()(Register)
