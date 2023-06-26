import React from 'react';
import { Form, Upload, Breadcrumb, Statistic, Input, Col, Select, Row, Button, DatePicker } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './LeaveTrackerForm.css';

const dateFormat = 'YYYY/MM/DD';
const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

class LeaveTrackerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleSubmit = (values) => {
    console.log('Form values:', values);
    // Save the form data to the server or perform any required action
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col id="responsive-div1" span={16}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Leave Management</Breadcrumb.Item>
              <Breadcrumb.Item>Apply Leave</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360, marginRight: '20px' }}>
              <Form
                onFinish={this.handleSubmit}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 12 }}
                layout="horizontal"
              >
                {/* Form fields for Leave Type, Start Date, End Date, Number of Days, Reason, Status */}
                <Form.Item
                  label="Leave Type"
                  name="leaveType"
                  rules={[{ required: true, message: 'Please select leave type!' }]}
                >
                  <Select placeholder="Select leave type">
                    <Option key="Casual">Casual</Option>
                    <Option key="Annual">Annual</Option>
                    <Option key="Sick">Sick</Option>
                    <Option key="Maternity">Maternity</Option>
                    <Option key="Paternity">Paternity</Option>
                    <Option key="Other">Other</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Start Date"
                  name="startDate"
                  rules={[{ required: true, message: 'Please select start date!' }]}
                >
                  <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item
                  label="End Date"
                  name="endDate"
                  rules={[{ required: true, message: 'Please select end date!' }]}
                >
                  <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item
                  label="No. of Days"
                  name="numberOfDays"
                  rules={[{ required: true, message: 'Please enter number of days!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Reason"
                  name="reason"
                  rules={[{ required: true, message: 'Please enter reason!' }]}
                >
                  <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                  label="Status"
                  name="status"
                  rules={[{ required: true, message: 'Please select status!' }]}
                >
                  <Select placeholder="Select status">
                    <Option key="1">Approve</Option>
                    <Option key="2">Reject</Option>
                    <Option key="3">Pending</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Uploaded File/Folder"
                  name="fileList"
                  valuePropName="fileList"
                  getValueFromEvent={event => event.fileList}
                >
                  <Dragger>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  </Dragger>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button style={{ marginLeft: '10px' }}>Cancel</Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col id="responsive-div2" span={8}>
            {/* Remaining Leave Statistic */}
            <Statistic title="Remaining Leave" value={10} suffix="/ 20" />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default LeaveTrackerForm;
