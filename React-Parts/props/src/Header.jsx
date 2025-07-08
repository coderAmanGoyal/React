import React from 'react'

export default function Header({info, cname, children}) {
  return (
    <>
    <div>Header {cname} {info.class}</div>
    <h1>{children}</h1>
    </>
  )
}
