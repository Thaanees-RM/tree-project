import React from 'react'

const PrivacyPolicy = () => {
  return (
    <>
      <div className='flex flex-col gap-10 px-8 md:px-20 py-20 bg-[#E3FFEF]'>

        <div>
          <h1 className='text-5xl font-bold text-[#006A34]'>
            Privacy Policy
          </h1>
        </div>

        <div className='flex flex-col gap-8 md:w-230'>

          <section>
            <h2 className='text-2xl font-medium text-[#006A34] mb-4'>
              Introduction
            </h2>
            <p className='text-base font-normal text-black'>
              Welcome to the Tree Planting Campaign Portal (“we”, “our”, “us”). Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-medium text-[#006A34] mb-4'>
              Information We Collect
            </h2>
            <p className='text-base font-normal text-black'>
              When you participate in the campaign, we may collect the following information
            </p>
            <ul className="list-disc list-outside ml-8 mt-4 space-y-1">
              <li>Full Name </li>
              <li>Email Address </li>
              <li>Location (City, Country) </li>
              <li>Photo(s) of Your Tree Planting Activity </li>
              <li>Consent Preferences (Privacy Policy acceptance, newsletter subscription)</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-medium text-[#006A34] mb-4'>
              How We Use Your Information
            </h2>
            <p className='text-base font-normal text-black'>
              Your data is used to:
            </p>
            <ul className="list-disc list-outside ml-8 mt-4 space-y-1">
              <li>Generate and send your personalized tree planting certificate </li>
              <li>Verify your submission manually through our admin volunteers </li>
              <li>Improve our campaign outreach and impact tracking</li>
              <li>Send optional campaign updates (if you opted in) </li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-medium text-[#006A34] mb-4'>
              Sharing Information
            </h2>
            <p className='text-base font-normal text-black'>
              We do not sell, rent, or share your personal information with third parties, except:
            </p>
            <ul className="list-disc list-outside ml-8 mt-4 space-y-1">
              <li>When required by law </li>
              <li>For certificate delivery via email platforms </li>
              <li>With trusted partners for campaign analytics (in anonymized form)</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-medium text-[#006A34] mb-4'>
              Photo Use
            </h2>
            <p className='text-base font-normal text-black'>
              By uploading a photo, you agree that:
            </p>
            <ul className="list-disc list-outside ml-8 mt-4 space-y-1">
              <li>It may be displayed in the campaign gallery or used for promotional materials (if permission is granted via checkbox) </li>
              <li>You have the right to share the image and have obtained any necessary consents </li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-medium text-[#006A34] mb-4'>
              Data Storage and Security
            </h2>
            <p className='text-base font-normal text-black'>
              We take appropriate technical and organizational measures to protect your data. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-medium text-[#006A34] mb-4'>
              Your Rights
            </h2>
            <p className='text-base font-normal text-black'>
              You have the right to:
            </p>
            <ul className="list-disc list-outside ml-8 mt-4 space-y-1">
              <li>Request access to your data </li>
              <li>Request deletion of your data </li>
              <li>Withdraw consent for marketing at any time </li>
            </ul>
            <p className='text-base font-normal text-black mt-2'>
              To exercise these rights, please contact us at: [Insert Email Address]
            </p>
          </section>

          <section>
            <p className='text-base font-normal text-black'>
              Effective Date: [Insert Date]
            </p>
            <p className='text-base font-normal text-black mt-2'>
              Last Updated: [Insert Date]
            </p>
          </section>
          
        </div>

      </div>
    </>
  )
}

export default PrivacyPolicy