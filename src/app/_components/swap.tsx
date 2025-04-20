"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { toast } from "sonner"
import { cn } from "~/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"

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
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "~/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "~/components/ui/popover"
import * as React from "react"

const FormSchema = z.object({
  swapToken: z
    .string()
    .min(1, { message: "Please select a token to swap" })
    .refine((val) => coins.some(coin => coin.value === val), {
      message: "Please select a valid token"
    }),
  swapAmount: z.number().min(0.000000000000000001, {
    message: "Amount must be greater than 0",
  }),
  returnToken: z
    .string()
    .min(1, { message: "Please select a token to receive" })
    .refine((val) => coins.some(coin => coin.value === val), {
      message: "Please select a valid token"
    }),
})

type FormValues = z.infer<typeof FormSchema>

const coins = [
  {
    value: "ETH",
  },
  {
    value: "BTC",
  },
  {
    value: "USDC",
  },
  {
    value: "XRP",
  },
  {
    value: "FLR",
  },
  {
    value: "SOL",
  },
  {
    value: "ADA",
  },
  {
    value: "AVAX",
  },
  {
    value: "DOT",
  },
  {
    value: "MATIC",
  },
  {
    value: "LINK",
  },
  {
    value: "UNI",
  },
  {
    value: "AAVE",
  },
  {
    value: "ATOM",
  },
  {
    value: "DOGE",
  },
  {
    value: "SHIB",
  },
  {
    value: "LTC",
  },
  {
    value: "BCH",
  },
  {
    value: "XLM",
  },
  {
    value: "ALGO",
  },
]

export function Swap() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      swapToken: "",
      swapAmount: 0,
      returnToken: "",
    },
  })

  const [swapTokenOpen, setSwapTokenOpen] = React.useState(false)
  const [returnTokenOpen, setReturnTokenOpen] = React.useState(false)

  function onSubmit(data: FormValues) {
    toast("Swap Details:", {
      description: (
        <pre className="mt-2 w-[300px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 space-y-6">
        <FormField
          control={form.control}
          name="swapToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token to Send</FormLabel>
              <FormControl>
                <Popover open={swapTokenOpen} onOpenChange={setSwapTokenOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      role="combobox"
                      aria-expanded={swapTokenOpen}
                      className="w-full justify-between"
                    >
                      {field.value
                        ? coins.find((coin) => coin.value === field.value)?.value
                        : "Select token..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command className="rounded-lg border shadow-md">
                      <CommandInput 
                        placeholder="Search tokens..." 
                        className="h-9 border-0 focus-visible:ring-0"
                      />
                      <CommandList className="max-h-[200px]">
                        <CommandEmpty>No token found.</CommandEmpty>
                        <CommandGroup>
                          {coins.map((coin) => (
                            <CommandItem
                              key={coin.value}
                              value={coin.value}
                              onSelect={() => {
                                field.onChange(coin.value)
                                setSwapTokenOpen(false)
                              }}
                              className="cursor-pointer"
                            >
                              {coin.value}
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  field.value === coin.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>
                Select the token you want to send
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="swapAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Button
                  className="w-full justify-between"
                  onClick={(e) => e.preventDefault()}
                >
                  <Input
                    type="number"
                    placeholder="0.1"
                    className="w-full border-0 bg-transparent p-0 focus-visible:ring-0"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </Button>
              </FormControl>
              <FormDescription>
                Enter the amount you want to swap
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="returnToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token to Receive</FormLabel>
              <FormControl>
                <Popover open={returnTokenOpen} onOpenChange={setReturnTokenOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      role="combobox"
                      aria-expanded={returnTokenOpen}
                      className="w-full justify-between"
                    >
                      {field.value
                        ? coins.find((coin) => coin.value === field.value)?.value
                        : "Select token..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command className="rounded-lg border shadow-md">
                      <CommandInput 
                        placeholder="Search tokens..." 
                        className="h-9 border-0 focus-visible:ring-0"
                      />
                      <CommandList className="max-h-[200px]">
                        <CommandEmpty>No token found.</CommandEmpty>
                        <CommandGroup>
                          {coins.map((coin) => (
                            <CommandItem
                              key={coin.value}
                              value={coin.value}
                              onSelect={() => {
                                field.onChange(coin.value)
                                setReturnTokenOpen(false)
                              }}
                              className="cursor-pointer"
                            >
                              {coin.value}
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  field.value === coin.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
