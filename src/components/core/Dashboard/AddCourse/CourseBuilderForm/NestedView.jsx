import {React ,useState}from 'react'
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SubSectionModal from './SubSectionModal'
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  // States to keep track of mode of modal [add, view, edit]
  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  // Create a SweetAlert2 instance
  const MySwal = withReactContent(Swal);
  const handleDeleteClickSection = (sectionId) => {
    MySwal.fire({
      title: 'Delete this Section?',
      text: 'All the lectures in this section will be deleted',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDeleteSection(sectionId);
      }
    });
  };
  // Your handleDeleteSection function
  const handleDeleteSection = async (sectionId) => {
    try {
      const result = await deleteSection({
        sectionId,
        courseId: course._id,
        token,
      });
      if (result) {
        dispatch(setCourse(result));
      }
      MySwal.fire({
        title: 'Deleted!',
        text: 'The section has been deleted.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: 'There was an error deleting the section.',
        icon: 'error',
      });
    }
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    try {
      const result = await deleteSubSection({ subSectionId, sectionId, token });
      if (result) {
        // update the structure of course
        const updatedCourseContent = course.courseContent.map((section) =>
          section._id === sectionId ? result : section
        );
        const updatedCourse = { ...course, courseContent: updatedCourseContent };
        dispatch(setCourse(updatedCourse));
      }
      MySwal.fire({
        title: 'Deleted!',
        text: 'The sub-section has been deleted.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: 'There was an error deleting the sub-section.',
        icon: 'error',
      });
    }
  };

  const handleDeleteClickSubsection = (subSectionId, sectionId) => {
    MySwal.fire({
      title: 'Delete this Sub-Section?',
      text: 'This lecture will be deleted',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDeleteSubSection(subSectionId, sectionId);
      }
    });
  };

  return (
    <div>
      <div className="rounded-lg bg-richblack-700 p-6 px-8" id="nestedViewContainer">
        {course?.courseContent?.map((section) => (
          // Section Dropdown
          <details key={section._id} open>
            {/* Section Dropdown Content */}
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-x-3 ">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50 cursor-pointer">
                  {section.sectionName}
                </p>
              </div>
              <div className="flex items-center gap-x-3 cursor-pointer">
                <div
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit className="text-xl text-richblack-300" />
                </div>
                <div onClick={() => handleDeleteClickSection(section._id)}>
                  <RiDeleteBin6Line className="text-xl text-richblack-300 cursor-pointer" />
                </div>
                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className={`text-xl text-richblack-300`} />
              </div>
            </summary>
            <div className="px-6 pb-4">
              {/* Render All Sub Sections Within a Section */}
              {section.subSection.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                  <div className="flex items-center gap-x-3 py-2 ">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50 cursor-pointer">
                      {data.subSectionName}
                    </p>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3 cursor-pointer"
                  >
                    <div
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit className="text-xl text-richblack-300 cursor-pointer" />
                    </div>
                    <div onClick={() =>handleDeleteClickSubsection (data._id, section._id)}>
                      <RiDeleteBin6Line className="text-xl text-richblack-300 cursor-pointer" />
                    </div>
                  </div>
                </div>
              ))}
              {/* Add New Lecture to Section */}
              <div
                onClick={() => setAddSubsection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50 cursor-pointer"
              >
                <FaPlus className="text-lg" />
                <p>Add Lecture</p>
              </div>
            </div>
          </details>
        ))}
      </div>
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}
    </div>
  )
}

export default NestedView
