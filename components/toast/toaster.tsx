"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/toast/toast"
import { useToast } from "@/hooks/useToast";
import {AlertOctagon, AlertTriangle, CheckCircle} from "lucide-react";

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action,...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              <div className="flex gap-3">
                {!props.variant || props.variant === "default" && <CheckCircle /> }
                {props.variant === "warn" && <AlertTriangle /> }
                {props.variant === "destructive" && <AlertOctagon /> }
                <div className="flex-1">
                  {title && <ToastTitle>{title}</ToastTitle>}
                  {description && (
                      <ToastDescription>{description}</ToastDescription>
                  )}
                </div>

              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
