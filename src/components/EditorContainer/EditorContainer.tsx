"use client"

import BeePlugin from "@beefree.io/sdk"
import {
  ExecCommands,
  IEntityContentJson
} from "@beefree.io/sdk/dist/types/bee"
import { AxiosResponse } from "axios"
import { useCallback, useEffect, useState } from "react"

import {
  BasicCheckAPIResponse,
  CheckAPICategory,
  CheckAPIRequest,
  CheckAPIResponse
} from "@/app/api/check/types"
import { Editor } from "@/components/Editor/Editor"
import styles from "@/components/EditorContainer/EditorContainer.module.scss"
import { HeaderEditor } from "@/components/EditorHeader/EditorHeader"
import { clientAxiosInstance } from "@/helpers/axios"

import { Loader } from "../Loader/Loader"

const EditorContainer = () => {
  const [pluginInstance, setPluginInstance] = useState<BeePlugin | null>(null)
  const [loading, setLoading] = useState(true)
  const [localJson, setLocalJson] = useState<IEntityContentJson | null>(null)
  const [checkResults, setCheckResults] = useState<BasicCheckAPIResponse>()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleLoadTemplate = useCallback(async (filename: string) => {
    try {
      const response = await fetch(`/templates/${filename}`)
      if (response.ok) {
        const templateData = await response.json()
        setLocalJson(templateData)
      } else {
        console.error("Failed to load template:", filename)
      }
    } catch (error) {
      console.error("Error loading template:", error)
    }
  }, [])

  useEffect(() => {
    handleLoadTemplate("simple-template.json")
  }, [handleLoadTemplate])

  const onPluginStart = () => {
    setLoading(false)
  }

  const handleOnChange = (json: string) => {
    setLocalJson(JSON.parse(json))
  }

  const handleCheck = async (localJson: IEntityContentJson) => {
    if (isPopoverOpen) {
      setIsPopoverOpen(false)
    } else {
      setCheckResults(undefined)
      setIsPopoverOpen(true)
      const response = await clientAxiosInstance.post<
        CheckAPIResponse,
        AxiosResponse<CheckAPIResponse>,
        CheckAPIRequest
      >("/api/check", {
        template: localJson,
        checks: [
          {
            // this warning targets the widgets: gif, image, sticker, icon, social
            category: CheckAPICategory.MISSING_ALT_TEXT
          },
          {
            // this warning targets the widgets: gif, image, sticker, icon, social
            category: CheckAPICategory.OVERAGE_IMAGE_WEIGHT,
            limit: 500
          }
          // {
          //   // this warning targets the widgets: button, social, menu
          //   category: CheckAPICategory.MISSING_COPY_LINK
          // },
          // {
          //   // this warning targets the size of the template
          //   category: CheckAPICategory.OVERAGE_HTML_WEIGHT,
          //   limit: 5 // kb
          // },
          // {
          //   // this suggestion targets the widgets: gif, image, sticker, icon
          //   category: CheckAPICategory.MISSING_IMAGE_LINK
          // },
          // {
          //   // this suggestion targets the subject and preheader
          //   category: CheckAPICategory.MISSING_DETAILS_EMAIL
          // }
        ]
      })

      const defaultCheckResult = response.data.find(
        (e) => e.language === "default"
      )

      if (defaultCheckResult) {
        setCheckResults(defaultCheckResult)
      }
    }
  }

  const hoverChecksTarget = async (editorInstance: BeePlugin, uuid: string | null) => {
    if (uuid) {
      // scroll to the target widget in the staging area
      await editorInstance.execCommand(ExecCommands.SCROLL, { target: { uuid } })
      // highlight the target widget in the staging area
      await editorInstance.execCommand(ExecCommands.HIGHLIGHT, { target: { uuid } })
    }
  }

  const selectChecksTarget = async (
    editorInstance: BeePlugin,
    uuid: string | null,
    selector: string | null
  ) => {
    if (uuid) {
      // select the target widget in the staging area
      await editorInstance.execCommand(ExecCommands.SELECT, { target: { uuid } })
    }
    if (selector) {
      // focus the target field in the sidebar after the widget selection
      await editorInstance.execCommand(ExecCommands.FOCUS, { target: { selector } })
    }
    setIsPopoverOpen(false)
  }

  return (
    <div className={styles.Container}>
      {pluginInstance && localJson && (
        <HeaderEditor
          isPopoverOpen={isPopoverOpen}
          onCheck={() => handleCheck(localJson)}
          checkResults={checkResults}
          onTargetHover={(uuid: string | null) => hoverChecksTarget(pluginInstance, uuid)}
          onTargetClick={(uuid: string | null, key: string | null) => selectChecksTarget(pluginInstance, uuid, key)}
        />
      )}
      {localJson && (
        <Editor
          onInstanceCreated={setPluginInstance}
          onStart={onPluginStart}
          template={localJson}
          onChange={handleOnChange}
        />
      )}
      <Loader show={!!localJson && loading} />
    </div>
  )
}

export { EditorContainer }
