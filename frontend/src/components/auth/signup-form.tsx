import {cn} from "@/lib/utils.ts"
import {Card, CardContent} from "@/components/ui/card.tsx"
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuthStore} from "@/stores/useAuthStore.ts";
import {useNavigate} from "react-router";

const signupFormSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormValues = z.infer<typeof signupFormSchema>;

export function SignupForm({
                               className,
                               ...props
                           }: React.ComponentProps<"div">) {

    const {signUp} = useAuthStore();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignUpFormValues>({
        resolver: zodResolver(signupFormSchema)
    });

    const onSubmit = async (data: SignUpFormValues) => {
        const {firstName, lastName, username, email, password} = data;

        await signUp(username, password, email, firstName, lastName);

        navigate("/signin");

    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0 border-border">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center gap-2">
                                <a href="/frontend/public" className="mx-auto block w-fit text-center">
                                    <span>Logo</span>
                                </a>
                                <h1 className="text-3xl font-bold">
                                    Create an account
                                </h1>
                                <p className="text-muted-foreground">
                                    Welcome! Start your journey by signing up.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="block test-sm">
                                        First Name
                                    </Label>
                                    <Input
                                        type={"text"}
                                        id={"firstName"}
                                        {...register("firstName")}
                                    >


                                    </Input>
                                    {
                                        errors.firstName &&
                                        (
                                            <p className="text-destructive text-sm">
                                                {errors.firstName.message}
                                            </p>
                                        )
                                    }
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="block test-sm">
                                        Last Name
                                    </Label>
                                    <Input
                                        type={"text"}
                                        id={"lastName"}
                                        {...register("lastName")}
                                    >

                                    </Input>
                                    {
                                        errors.lastName &&
                                        (
                                            <p className="text-destructive text-sm">
                                                {errors.lastName.message}
                                            </p>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="username" className="block test-sm">
                                    Username
                                </Label>
                                <Input type={"text"} id={"username"}
                                       {...register("username")}

                                >
                                </Input>
                                {
                                    errors.username &&
                                    (
                                        <p className="text-destructive text-sm">
                                            {errors.username.message}
                                        </p>
                                    )
                                }
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="email" className="block test-sm">
                                    Email
                                </Label>
                                <Input type={"email"} id={"email"}
                                       {...register("email")}
                                >
                                </Input>
                                {
                                    errors.email &&
                                    (
                                        <p className="text-destructive text-sm">
                                            {errors.email.message}
                                        </p>
                                    )
                                }
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="password" className="block test-sm">
                                    Password
                                </Label>
                                <Input type={"password"} id={"password"}
                                       {...register("password")}
                                >
                                </Input>
                                {
                                    errors.password &&
                                    (
                                        <p className="text-destructive text-sm">
                                            {errors.password.message}
                                        </p>
                                    )
                                }
                            </div>
                            <Button type={"submit"} className="w-full" disabled={isSubmitting}>
                                Create Account
                            </Button>
                            <div className="text-center text-sm">
                                Already have an account?
                                <a href="/signin" className="text-primary underline underline-offset-4"> Log in</a>
                            </div>
                        </div>
                    </form>
                    <div className="bg-muted relative hidden md:block">
                        <img
                            src="/placeholderSignUp.png"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                </CardContent>
            </Card>
            <div
                className="text-xs text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offetset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
