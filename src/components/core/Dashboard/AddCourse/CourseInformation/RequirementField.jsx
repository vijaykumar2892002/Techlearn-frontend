import React, { useEffect, useState } from 'react';

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState(getValues(name) || []);

    useEffect(() => {
        register(name, { required: true });
    }, [register, name]);

    useEffect(() => {
        setValue(name, requirementList);
        console.log(name,requirementList)
    }, [requirementList, setValue, name]);

    const handleAddRequirement = () => {
        if (requirement.trim() !== "") {
            setRequirementList([...requirementList, requirement.trim()]);
            setRequirement("");
        }
    };

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = requirementList.filter((_, i) => i !== index);
        setRequirementList(updatedRequirementList);
    };

    return (
        <div>
            <label htmlFor={name}>
                {label}<sup>*</sup>
            </label>
            <div>
                <input
                    type="text"
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="w-full"
                />
                <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="font-semibold text-yellow-50 text-lg"
                >
                    Add
                </button>
            </div>

            {requirementList.length > 0 && (
                <ul>
                    {requirementList.map((req, index) => (
                        <li key={index} className=" text-lg flex items-center text-caribbeangreen-100">
                            <p>{req}</p>
                            <button
                                type="button"
                                onClick={() => handleRemoveRequirement(index)}
                                className="text-lg text-pink-200 ml-3"
                            >
                                clear
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {errors[name] && (
                <span>{label} is required</span>
            )}
        </div>
    );
};

export default RequirementField;

// Usage example
// <RequirementField
//     name="courseTags"
//     label="Tags"
//     register={register}
//     errors={errors}
//     setValue={setValue}
//     getValues={getValues}
// />
