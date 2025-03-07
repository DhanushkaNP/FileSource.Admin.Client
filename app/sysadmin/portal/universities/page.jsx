"use client";

import DeleteModal from "@/components/DeleteModal";
import CreateFormModal from "@/components/Form/CreateFormModal";
import UpdateFormModal from "@/components/Form/UpdateFormModal";
import RowDataContainer from "@/components/RowData/RowDataContainer";
import RowDataHeader from "@/components/RowData/RowDataHeader";
import RowDataItem from "@/components/RowData/RowDataItem";
import { useUserToken } from "@/utils/Auth/auth-selectors";
import api from "@/utils/api";
import { Form, Input } from "antd";
import React, { useEffect, useState } from "react";

const Universites = () => {
  const token = useUserToken();
  const [universities, setUniversities] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [isCreateUniversityModalOpen, SetIsCreateUniversityModalOpen] =
    useState(false);
  const [universityDeleteModalDetails, setUniversityDeleteModalDetails] =
    useState({
      isOpen: false,
      id: null,
      name: null,
    });
  const [universityEditModalDetails, setUniversityEditModalDetails] = useState({
    isOpen: false,
    universityId: null,
    name: null,
    shortName: null,
  });

  const [isCreateFacultyModalOpen, setIsCreateFacultyModalOpen] =
    useState(false);
  const [facultyDeleteModalDetails, setFacultyDeleteModalDetails] = useState({
    isOpen: false,
    id: null,
    name: null,
  });
  const [facultyEditModalDetails, setFacultyEditModalDetails] = useState({
    isOpen: false,
    facultyId: null,
    name: null,
    shortName: null,
    email: null,
  });

  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const fetchUniversities = async () => {
    try {
      await api.get("University/list", null, token).then((response) => {
        if (response.items == null) {
          console.log("No universities");
        }
        setUniversities(response.items);
      });
    } catch (error) {
      throw error;
    }
  };

  const fetchFaculties = async () => {
    try {
      await api
        .get(`University/${selectedUniversity}/faculties`, null, token)
        .then((response) => {
          if (response.items.length > 0) {
            setFaculties(response.items);
          }
        });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  useEffect(() => {
    fetchFaculties();
  }, [selectedUniversity]);

  const onCreateUniversity = async (values) => {
    await api.post(
      "university/create",
      { name: values.name, shortName: values["short-name"] },
      token
    );
    fetchUniversities();
    SetIsCreateUniversityModalOpen(false);
  };

  const deleteUniversity = async (id) => {
    await api.delete(`university/${id}`, token);
    setUniversityDeleteModalDetails({ isOpen: false, id: null, name: null });
    fetchUniversities();
  };

  const UpdateUniversity = async (values) => {
    await api.put(
      `university/${universityEditModalDetails.universityId}`,
      {
        name: values["name"],
        shortName: values["short-name"],
      },
      token
    );
    fetchUniversities();
    setUniversityEditModalDetails({
      isOpen: false,
      universityId: null,
      name: null,
      shortName: null,
    });
  };

  const universityOnEditClickHandler = async (id) => {
    try {
      await api.get(`/university/${id}`, null, token).then((response) => {
        setUniversityEditModalDetails({
          isOpen: true,
          universityId: response.id,
          name: response.name,
          shortName: response.shortName,
        });
      });
    } catch (error) {
      throw error;
    }
  };

  const onUniversityRowClickHandler = async (id) => {
    setFaculties([]);
    setSelectedUniversity(id);
    try {
    } catch (error) {}
  };

  const onCreateFaculty = async (values) => {
    await api.post(
      `university/${selectedUniversity}/faculty`,
      {
        name: values.name,
        shortName: values["short-name"],
        email: values["faculty-email"],
        password: values.password,
      },
      token
    );
    fetchFaculties();
    setIsCreateFacultyModalOpen(false);
  };

  const deleteFaculty = async (id) => {
    await api.delete(`Faculty/${id}`, token);
    fetchFaculties();
    setFacultyDeleteModalDetails({ isOpen: false, id: null, name: null });
  };

  const UpdateFaculty = async (values) => {
    await api.put(
      `faculty/${facultyEditModalDetails.facultyId}`,
      {
        name: values["name"],
        shortName: values["short-name"],
        email: values["faculty-email"],
      },
      token
    );
    fetchFaculties();
    setFacultyEditModalDetails({
      isOpen: false,
      universityId: null,
      name: null,
      shortName: null,
      email: null,
    });
  };

  const facultyEditClickHandler = async (id) => {
    try {
      await api.get(`faculty/${id}`, null, token).then((response) => {
        setFacultyEditModalDetails({
          isOpen: true,
          facultyId: response.id,
          name: response.name,
          shortName: response.shortName,
          email: response.email,
        });
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className=" bg-white w-full font-default p-4 shadow-md rounded-md min-h-96 max-h-fit">
      {/* UniversityCreate */}
      <CreateFormModal
        open={isCreateUniversityModalOpen}
        onCancel={() => SetIsCreateUniversityModalOpen(false)}
        title={"Create a University"}
        onCreate={onCreateUniversity}
      >
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Name
            </span>
          }
          name={"name"}
          rules={[{ required: true, message: "Please input university name!" }]}
        >
          <Input className="font-default font-normal text-dark-dark-blue" />
        </Form.Item>
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Short Name
            </span>
          }
          name={"short-name"}
        >
          <Input className="font-default font-normal text-dark-dark-blue" />
        </Form.Item>
      </CreateFormModal>

      {/* University delete */}
      <DeleteModal
        open={universityDeleteModalDetails.isOpen}
        onCancel={() =>
          setUniversityDeleteModalDetails({
            isOpen: false,
            id: null,
            name: null,
          })
        }
        message={`Do you want to delete university ${universityDeleteModalDetails.name}?`}
        onDelete={() => deleteUniversity(universityDeleteModalDetails.id)}
      />

      {/* Update university Modal */}
      <UpdateFormModal
        open={universityEditModalDetails.isOpen}
        title={"Edit university details"}
        onCancel={() =>
          setUniversityEditModalDetails({
            isOpen: false,
            universityId: null,
            name: null,
            shortName: null,
          })
        }
        initialValues={{
          name: universityEditModalDetails.name,
          "short-name": universityEditModalDetails.shortName,
        }}
        onUpdate={UpdateUniversity}
      >
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Name
            </span>
          }
          name={"name"}
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input className="font-default font-normal text-dark-dark-blue" />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Short name
            </span>
          }
          name={"short-name"}
        >
          <Input className="font-default font-normal text-dark-dark-blue" />
        </Form.Item>
      </UpdateFormModal>

      {/* Create Faculty Modal */}
      <CreateFormModal
        open={isCreateFacultyModalOpen}
        onCancel={() => setIsCreateFacultyModalOpen(false)}
        title={"Create a Faculty"}
        onCreate={onCreateFaculty}
      >
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Name
            </span>
          }
          name={"name"}
          rules={[
            { required: true, message: "Please provide name for faculty!" },
          ]}
        >
          <Input className="font-default font-normal text-dark-dark-blue" />
        </Form.Item>
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Short Name
            </span>
          }
          name={"short-name"}
        >
          <Input className="font-default font-normal text-dark-dark-blue" />
        </Form.Item>
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Faculty Email
            </span>
          }
          name={"faculty-email"}
          rules={[
            { required: true, message: "Please input email for faculty" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input
            className="font-default font-normal text-dark-dark-blue"
            autoComplete="new-email"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Password
            </span>
          }
          name={"password"}
          rules={[
            { required: true, message: "Please input a valid Password!" },
            {
              validator: (_, value) => {
                if (value && (value.length < 8 || value.length > 8)) {
                  return Promise.reject(
                    "Password must be exactly 8 characters!"
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password
            className="font-default font-normal text-dark-dark-blue"
            autoComplete="new-password"
          />
        </Form.Item>
      </CreateFormModal>

      {/* Delete Faculty Modal */}
      <DeleteModal
        open={facultyDeleteModalDetails.isOpen}
        onCancel={() => {
          setFacultyDeleteModalDetails({
            isOpen: false,
            id: null,
            name: null,
          });
        }}
        message={`Do you want delete ${facultyDeleteModalDetails.name}?`}
        onDelete={() => deleteFaculty(facultyDeleteModalDetails.id)}
      />

      {/* update Faculty Modal */}
      <UpdateFormModal
        open={facultyEditModalDetails.isOpen}
        message={"Update university details"}
        onCancel={() =>
          setFacultyEditModalDetails({
            isOpen: false,
            facultyId: null,
            name: null,
            shortName: null,
            email: null,
          })
        }
        initialValues={{
          name: facultyEditModalDetails.name,
          "short-name": facultyEditModalDetails.shortName,
          "facult-email": facultyEditModalDetails.email,
        }}
        onUpdate={UpdateFaculty}
      >
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Name
            </span>
          }
          name={"name"}
          rules={[
            { required: true, message: "Please provide name for faculty!" },
          ]}
        >
          <Input className="font-default font-normal text-dark-dark-blue" />
        </Form.Item>
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Short Name
            </span>
          }
          name={"short-name"}
        >
          <Input className="font-default font-normal text-dark-dark-blue" />
        </Form.Item>
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Faculty Email
            </span>
          }
          name={"faculty-email"}
          rules={[
            { required: true, message: "Please input email for faculty" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input
            className="font-default font-normal text-dark-dark-blue"
            autoComplete="new-email"
          />
        </Form.Item>
      </UpdateFormModal>

      {/* Universities in rows */}
      <RowDataContainer>
        <RowDataHeader
          title={"Universities"}
          subTitle={"Add a university"}
          onButtonClick={() => SetIsCreateUniversityModalOpen(true)}
        />
        {universities.map((u) => (
          <RowDataItem
            title={u.name}
            key={u.id}
            id={u.id}
            onDeleteClickHandler={(id, name) => {
              setUniversityDeleteModalDetails({
                isOpen: true,
                id: id,
                name: name,
              });
            }}
            onEditClickHandler={universityOnEditClickHandler}
            onRowClick={onUniversityRowClickHandler}
            selectedRowItemId={selectedUniversity}
          />
        ))}
      </RowDataContainer>

      {/* Faculties in rows */}
      {selectedUniversity && (
        <RowDataContainer className=" pt-10">
          <RowDataHeader
            title={"Faculties"}
            subTitle={"Faculties of the university"}
            onButtonClick={() => {
              setIsCreateFacultyModalOpen(true);
            }}
          />
          {faculties.map((f) => (
            <RowDataItem
              title={f.name}
              subtitle={f.shortName}
              key={f.key}
              id={f.id}
              onDeleteClickHandler={(id, name) => {
                setFacultyDeleteModalDetails({
                  isOpen: true,
                  id: id,
                  name: name,
                });
              }}
              onEditClickHandler={facultyEditClickHandler}
            />
          ))}
        </RowDataContainer>
      )}
    </div>
  );
};

export default Universites;
