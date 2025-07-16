"use client"

import BeePlugin from "@beefree.io/sdk"
import { IEntityContentJson } from "@beefree.io/sdk/dist/types/bee"
import { useState } from "react"

import { Editor } from "@/components/Editor/Editor"
import styles from "@/components/EditorContainer/EditorContainer.module.scss"
import { HeaderEditor } from "@/components/EditorHeader/EditorHeader"
import { TemplateSelector } from "@/components/TemplateSelector/TemplateSelector"

import { Loader } from "../BeeLoader/BeeLoader"

const EditorContainer = () => {
  const [pluginInstance, setPluginInstance] = useState<BeePlugin | null>(null)
  const [beeLoaderDone, setBeeLoaderDone] = useState(false)
  const [localJson, setLocalJson] = useState<IEntityContentJson | null>(null)

  const onPluginStart = () => {
    setBeeLoaderDone(true)
  }

  const handleLoadTemplate = async (filename: string) => {
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
  }

  const handleOnChange = (json: string) => {
    setLocalJson(JSON.parse(json))
  }

  return (
    <div className={styles.Container}>
      {pluginInstance && <HeaderEditor />}
      {localJson ? (
        <Editor
          onInstanceCreated={setPluginInstance}
          onStart={onPluginStart}
          template={localJson}
          onChange={handleOnChange}
        />
      ) : (
        <TemplateSelector onLoadTemplate={handleLoadTemplate} />
      )}
      <Loader show={!!localJson && !beeLoaderDone} />
    </div>
  )
}

export { EditorContainer }
