import React from 'react'

const Footer = () => {
  return (
    <section  className=' section-padding w-full border-t py-6 flex justify-center'>
        <div className="text-sm flex gap-3">
            <p>Designed by Gogrene.</p>  <span>{new Date().getFullYear()}</span>
        </div>
    </section>
  )
}

export default Footer