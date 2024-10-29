import React from 'react'
import { Callout } from '@radix-ui/themes'
import { GoAlert } from "react-icons/go";

interface theme{
  message: string
}

const CalloutTheme = ({message}:theme) => {
  return (
    <div>
        { typeof window !== "undefined" && <Callout.Root color='red' role='alert'>
            <Callout.Icon>
            <GoAlert />
            </Callout.Icon>
            <Callout.Text>
                {message}
            </Callout.Text>
        </Callout.Root>}
    </div>
  )
}

export default CalloutTheme