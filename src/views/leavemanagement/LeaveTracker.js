// import React from 'react';
// // Add this import statement at the top of the file
// import { Space } from 'antd';

// import { Form, Upload, Breadcrumb, Statistic, Table, Tag, Input, Col, Select, Row, Button, DatePicker } from 'antd';
// import { InboxOutlined } from '@ant-design/icons';
// import './LeaveTracker.css';
// const dateFormat = 'YYYY/MM/DD';
// const { TextArea } = Input;
// const props = Upload;

// const columns = [
//   {
//     title: 'Leave Type',
//     key: 'tags',
//     dataIndex: 'tags',
//     render: tags => (
//       <span>
//         {tags.map(tag => {
//           let color = tag;
//           if (tag === 'Medical') {
//             color = 'volcano';
//           } else if (tag === 'Annual') {
//             color = 'green';
//           } else if (tag === 'Casual') {
//             color = 'geekblue';
//           }

//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </span>
//     ),
//   },
//   {
//     title: 'Start Date',
//     dataIndex: 'sdate',
//   },
//   {
//     title: 'End Date',
//     dataIndex: 'edate',
//   },
//   {
//     title: 'Number of Days',
//     dataIndex: 'number',
//   },
//   {
//     title: 'Reason',
//     dataIndex: 'reason',
//   },
//   {
//     title: 'Status',
//     dataIndex: 'status',
//   },
// ];

// const data = [
//   {
//     key: '1',
//     tags: ['Medical'],
//     sdate: '2019/05/21',
//     edate: '2019/05/22',
//     number: '2',
//     reason: 'Medical',
//     status: '1',
//   },
//   {
//     key: '2',
//     tags: ['Casual'],
//     sdate: '2019/05/21',
//     edate: '2019/05/23',
//     number: '3',
//     reason: 'Wedding',
//     status: '1',
//   },
//   {
//     key: '3',
//     tags: ['Annual'],
//     sdate: '2019/05/21',
//     edate: '2019/05/27',
//     number: '7',
//     reason: 'Trip',
//     status: '1',
//   },
// ];

// class LeaveTracker extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       leaveType: [],
//     };
//     this.refreshgetAllLeaveType = this.refreshgetAllLeaveType.bind(this);
//   }

//   refreshgetAllLeaveType() {
//     /* this.state.leaveType.splice(0, this.state.leaveType.length);
//     getAllLeaveType().then((response) => {
//       for (let i = 0; i < response.length; i++) {

//         this.state.leaveType.push(<Option key={response[i].leaveTypeValue}>{response[i].leaveTypeValue}</Option>);

//       }

//     });

//     console.log(this.state.leaveType);*/
//   }

//   componentDidMount() {
//     this.refreshgetAllLeaveType();
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <Row>
//           <Col id="responsive-div1" span={16}>
//             <Breadcrumb style={{ margin: '16px 0' }}>
//               <Breadcrumb.Item>Leave Managment</Breadcrumb.Item>
//               <Breadcrumb.Item>Apply Leave</Breadcrumb.Item>
//             </Breadcrumb>
//             <div style={{ padding: 24, background: '#fff', minHeight: 360, marginRight: '20px' }}>
//               <Form.Item
//                 label="Leave Type"
//                 labelCol={{ span: 6 }}
//                 wrapperCol={{ span: 12 }}
//                 name="leaveType"
//                 rules={[{ required: true, message: 'Please select leave type!' }]}
//               >
//                 <Select placeholder="Select leave type">
//                   {this.state.leaveType}
        
//                 </Select>
//               </Form.Item>
//               <Form.Item
//                 label="Start Date"
//                 labelCol={{ span: 6 }}
//                 wrapperCol={{ span: 12 }}
//                 name="startDate"
//                 rules={[{ required: true, message: 'Please select start date!' }]}
//               >
//                 <DatePicker format={dateFormat} disabledDate={this.disabledStartDate} onChange={this.onStartChange} />
//               </Form.Item>
//               <Form.Item
//                 label="End Date"
//                 labelCol={{ span: 6 }}
//                 wrapperCol={{ span: 12 }}
//                 name="endDate"
//                 rules={[{ required: true, message: 'Please select end date!' }]}
//               >
//                 <DatePicker format={dateFormat} disabledDate={this.disabledEndDate} onChange={this.onEndChange} />
//               </Form.Item>
//               <Form.Item
//                 label="No. of Days"
//                 labelCol={{ span: 6 }}
//                 wrapperCol={{ span: 12 }}
//                 name="numberOfDays"
//                 rules={[{ required: true, message: 'Please enter number of days!' }]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 label="Reason"
//                 labelCol={{ span: 6 }}
//                 wrapperCol={{ span: 12 }}
//                 name="reason"
//                 rules={[{ required: true, message: 'Please enter reason!' }]}
//               >
//                 <TextArea rows={4} />
//               </Form.Item>
//               <Form.Item
//                 wrapperCol={{ offset: 6, span: 12 }}
//               >
//                 <Upload.Dragger {...props}>
//                   <p className="ant-upload-drag-icon">
//                     <InboxOutlined />
//                   </p>
//                   <p className="ant-upload-text">Click or drag file to this area to upload</p>
//                 </Upload.Dragger>
//               </Form.Item>
//               <Form.Item
//                 wrapperCol={{ offset: 6, span: 12 }}
//               >
//                 <Space>
//                   <Button type="primary">Submit</Button>
//                   <Button>Cancel</Button>
//                 </Space>
//               </Form.Item>
//             </div>
//           </Col>
//           <Col id="responsive-div2" span={8}>
//             <Statistic title="Remaining Leave" value={10} suffix="/ 20" />
//             <Table columns={columns} dataSource={data} />
//           </Col>
//         </Row>
//       </React.Fragment>
//     );
//   }
// }

// export default LeaveTracker;

import React from 'react';
import { Space } from 'antd';
import { Form, Upload, Breadcrumb, Statistic, Table, Input, Col, Select, Row, Button, DatePicker } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './LeaveTracker.css';
import { Redirect } from 'react-router-dom';


const dateFormat = 'YYYY/MM/DD';
const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

const columns = [
  {
    title: 'Leave Type',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag;
          if (tag === 'Medical') {
            color = 'volcano';
          } else if (tag === 'Casual') {
            color = 'green';
          } else if (tag === 'Annual') {
            color = 'purple';
          } else if (tag === 'Sick') {
            color = 'skyblue';
          } else if (tag === 'Maternity') {
            color = 'orange';
          } else if (tag === 'Paternity') {
            color = 'violet';
          } else if (tag === 'Others') {
            color = 'grey';
          }

          return (
            <span
              key={tag}
              style={{
                marginRight: '5px',
                display: 'inline-block',
                padding: '3px 8px',
                borderRadius: '4px',
                color: '#fff',
                backgroundColor: color,
              }}
            >
              {tag.toUpperCase()}
            </span>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Start Date',
    dataIndex: 'sdate',
  },
  {
    title: 'End Date',
    dataIndex: 'edate',
  },
  {
    title: 'Number of Days',
    dataIndex: 'number',
  },
  {
    title: 'Reason',
    dataIndex: 'reason',
  },
  {
    title: 'Uploaded File/Folder',
    dataIndex: 'file',
    render: file => (
      <span>{file ? <a href={file.url}>{file.name}</a> : 'No File/Folder'}</span>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: status => (
      <span>
        {status === '1' && <Button type="primary" size="small">Approve</Button>}
        {status === '2' && <Button danger size="small">Reject</Button>}
        {status === '3' && <Button disabled size="small">Pending</Button>}
      </span>
    ),
  },
];

class LeaveTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveType: ['Casual', 'Annual', 'Sick', 'Maternity', 'Paternity', 'Other'],
      data: [],
    };
    this.refreshgetAllLeaveType = this.refreshgetAllLeaveType.bind(this);
  }

  refreshgetAllLeaveType() {
    // Fetch and update leave types from the server
  }

  componentDidMount() {
    this.refreshgetAllLeaveType();
  }

  handleSubmit = (values) => {
    const newData = {
      key: this.state.data.length + 1,
      tags: [values.leaveType],
      sdate: values.startDate.format(dateFormat),
      edate: values.endDate.format(dateFormat),
      number: values.numberOfDays,
      reason: values.reason,
      file: values.fileList.length > 0 ? values.fileList[0] : null,
      status: values.status,
    };

    this.setState(prevState => ({
      data: [...prevState.data, newData],
    }));

    console.log('Submit button clicked!');
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
                    {this.state.leaveType.map(leave => (
                      <Option key={leave}>{leave}</Option>
                    ))}
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
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                    <Button>Cancel</Button>
                  </Space>
                </Form.Item>
              </Form>

              {/* Table to display Leave Type, Start Date, End Date, Number of Days, Reason, Uploaded File/Folder, Status */}
              <Table columns={columns} dataSource={this.state.data} style={{ marginTop: '30px' }} />
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

export default LeaveTracker;
