import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Home } from "lucide-react";

const AdmissionSuccessScreen = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white px-6 py-20">
      <div className="mx-auto max-w-3xl">
        {/* CARD */}

        <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-xl">
          {/* ICON */}

          <div className="flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-14 w-14 text-green-600" />
            </div>
          </div>

          {/* TITLE */}

          <h1 className="mt-8 text-center text-4xl font-extrabold text-gray-900">
            Admission Submitted Successfully
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-8 text-gray-600">
            Thank you for applying to{" "}
            <span className="font-bold text-black">ChartWiz Academy</span>
            .
            <br />
            Your admission request has been received successfully.
          </p>

          {/* TIMELINE */}

          <div className="mt-12 rounded-2xl border border-green-200 bg-green-50 p-8">
            <h2 className="mb-8 text-center text-2xl font-bold">
              What Happens Next?
            </h2>

            <div className="space-y-6">
              <Step
                number="1"
                text="Our admissions team reviews your application."
              />

              <Step
                number="2"
                text="You will receive a phone call from ChartWiz Academy."
              />

              <Step
                number="3"
                text="Payment instructions will be shared with you."
              />

              <Step
                number="4"
                text="After payment confirmation, your student account will be created."
              />

              <Step
                number="5"
                text="Your login credentials will be sent to your registered email."
              />
            </div>
          </div>

          {/* NOTICE */}

          <div className="mt-10 rounded-2xl border border-yellow-300 bg-yellow-50 p-6">
            <h3 className="text-lg font-bold text-yellow-900">
              Important Notice
            </h3>

            <p className="mt-3 leading-7 text-yellow-800">
              Please keep checking your email inbox (and Spam folder). Once your
              admission is approved and payment is confirmed, you will
              automatically receive your Student Portal login credentials.
            </p>
          </div>

          {/* BUTTONS */}

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 font-semibold text-white transition hover:bg-gray-800"
            >
              <Home size={20} />
              Back to Home
            </Link>

            <Link
              to="/courses"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-300 px-6 py-4 font-semibold transition hover:bg-gray-100"
            >
              Browse Courses
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Step = ({ number, text }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 font-bold text-white">
        {number}
      </div>

      <p className="pt-2 text-gray-700">{text}</p>
    </div>
  );
};

export default AdmissionSuccessScreen;
