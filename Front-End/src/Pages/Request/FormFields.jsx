import React from "react";

const FormFields = ({
  formData,
  handleInputChange,
  handleFileChange,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onChange={handleInputChange}
          value={formData.phoneNumber}
        />
      </div>
    </div>
    <div>
      <label
        htmlFor="profession"
        className="block text-sm font-medium text-gray-700"
      >
        Profession
      </label>
      <select
        name="profession"
        id="profession"
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        onChange={handleInputChange}
        value={formData.profession}
      >
        <option value="">Select Profession</option>
        <option value="Hair Specialist">Hair Specialist</option>
        <option value="Makeup Artist">Makeup Artist</option>
        <option value="Skincare Specialist">Skincare Specialist</option>
        <option value="Beauty Therapist">Beauty Therapist</option>
      </select>
    </div>
    <div>
      <label
        htmlFor="aboutMe"
        className="block text-sm font-medium text-gray-700"
      >
        About Me
      </label>
      <textarea
        name="aboutMe"
        id="aboutMe"
        rows="3"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        onChange={handleInputChange}
        value={formData.aboutMe}
        placeholder="Brief description about your experience and specialties..."
      ></textarea>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="certificate"
          className="block text-sm font-medium text-gray-700"
        >
          Certificate
        </label>
        <input
          type="file"
          name="certificate"
          id="certificate"
          required
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          onChange={handleFileChange}
        />
      </div>
    </div>
    <div>
      <label
        htmlFor="resume"
        className="block text-sm font-medium text-gray-700"
      >
        Resume
      </label>
      <input
        type="file"
        name="resume"
        id="resume"
        required
        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        onChange={handleFileChange}
      />
    </div>
    <div>
      <button
        type="submit"
        className="w-full bg-prim-button text-white py-2 px-4 rounded-md hover:bg-hover-button transition-colors"
      >
        Submit Application
      </button>
    </div>
  </form>
);

export default FormFields;
