import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Form, AutoComplete } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./NewLeadModal.css";
import { v4 as uuidv4 } from "uuid";
import Home from "./Map";
import { Select } from "antd";
// import usePlacesAutocomplete from 'use-places-autocomplete';

const NewLeadModal = ({ onSave, dataToEdit, setDataToEdit }) => {
  // const {
  //     value,
  //     suggestions,
  //     setValue,
  //     clearSuggestions
  // } = usePlacesAutocomplete({
  //     callbackName: "initMap",
  // });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    company: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (dataToEdit) {
      showModal();
      form.setFieldsValue(dataToEdit);
    }
  }, [dataToEdit]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(() => {
        const objToSave = {
          ...form.getFieldsValue(),
          id: uuidv4(),
        };
        onSave(objToSave);
        handleCancel();
        form.resetFields();
      })
      .catch((err) => {
        console.log("Error validating fields: ", err);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setDataToEdit(null);
    form.resetFields();
  };

  return (
    <div>
      <Button type="primary" className="new-lead-button" onClick={showModal}>
        New Lead
        <PlusOutlined />
      </Button>
      <Modal
        title="New Lead"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} className="new-lead-form" initialValues={formData}>
          <Form.Item
            name="company"
            rules={[{ required: true, message: "This section is mandatory" }]}
          >
            <Input placeholder="Company" />
          </Form.Item>
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "This section is mandatory" }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "This section is mandatory" }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "This section is mandatory" }]}
          >
            <Input type="number" placeholder="Phone" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "This section is mandatory" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "This section is mandatory" }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
          <Form.Item
            name="status"
            rules={[{ required: true, message: "This section is mandatory" }]}
          >
            <Select
              showSearch
              placeholder="Select Status"
              options={[
                {
                  value: "Unqualified",
                  label: "Unqualified",
                },
                {
                  value: "New",
                  label: "New",
                },
                {
                  value: "In Process",
                  label: "In Process",
                },
                {
                  value: "Needs Review",
                  label: "Needs Review",
                },
                {
                  value: "Converted",
                  label: "Converted",
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NewLeadModal;
