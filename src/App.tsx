import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  names: z.array(z.object({ name: z.string() })).refine(
    (items) => {
      return items.some((o) => o.name.startsWith("a"));
    },
    { message: "Starts with `a` at least one" }
  ),
});

function App() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      names: [{ name: "" }, { name: "" }],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function onInvalid(errors: FieldErrors<z.infer<typeof formSchema>>) {
    console.log(errors);
  }

  return (
    <main className="p-8">
      <h1 className="h1">
        If you submit without entering any information, "Undefined" will be
        displayed.
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="names"
            render={() => (
              <FormItem>
                <FormField
                  control={form.control}
                  name="names.0.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="names.1.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
}

export default App;
