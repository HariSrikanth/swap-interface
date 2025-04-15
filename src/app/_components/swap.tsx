"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { UseFormReturn, Control } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"

const FormSchema = z.object({
  swapToken: z.string().min(1, {
    message: "Please select a token to swap",
  }),
  swapAmount: z.number().min(0.000000000000000001, {
    message: "Amount must be greater than 0",
  }),
  returnToken: z.string().min(1, {
    message: "Please select a token to receive",
  }),
})

type FormValues = z.infer<typeof FormSchema>

export function Swap() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      swapToken: "",
      swapAmount: 0,
      returnToken: "",
    },
  }) as unknown as UseFormReturn<FormValues, any, undefined>

  function onSubmit(data: FormValues) {
    toast("Swap Details:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control as unknown as Control<FormValues>}
          name="swapToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token to Swap</FormLabel>
              <FormControl>
                <Input placeholder="ETH" {...field} />
              </FormControl>
              <FormDescription>
                Select the token you want to swap
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control as unknown as Control<FormValues>}
          name="swapAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.1"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Enter the amount you want to swap
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control as unknown as Control<FormValues>}
          name="returnToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token to Receive</FormLabel>
              <FormControl>
                <Input placeholder="USDC" {...field} />
              </FormControl>
              <FormDescription>
                Select the token you want to receive
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Swap</Button>
      </form>
    </Form>
  )
}
