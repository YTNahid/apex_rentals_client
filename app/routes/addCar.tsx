import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LoadingSpinnerSm from "~/components/LoadingSpinnerSm";
import ProtectedRoute from "~/components/ProtectedRoute";
import { useAuth } from "~/hooks/useAuth";
import api from "~/services/api";
import { getErrorMessage } from "~/utils/getErrorMessage";

export default function AddCar() {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleAddCar = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const form = e.currentTarget as HTMLFormElement;

      const carData = {
        carModel: (form.carModel as HTMLInputElement).value,
        dailyRentalPrice: (form.dailyRentalPrice as HTMLInputElement).value,
        location: (form.location as HTMLInputElement).value,
        vehicleRegistrationNumber: (form.vehicleRegistration as HTMLInputElement).value,
        availability: (form.availability as HTMLInputElement).value === "available" ? true : false,
        imageURL: (form.imageURL as HTMLInputElement).value,
        features: (form.features as HTMLInputElement).value,
        description: (form.description as HTMLInputElement).value,
        addedBy: user?.uid,
      };

      await api.post("/cars", carData).then((res) => res.data);

      Swal.fire({
        title: "Car added successfully",
        icon: "success",
      });
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(message, error);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <section className="section section-gap">
        <div className="row">
          <div className="column">
            <h6 className="sub-heading text-accent-color text-center">Login</h6>
            <h2 className="heading text-center">
              Welcome to <br></br>{" "}
              <span className="text-6xl">
                <span className="text-accent-color">APEX</span>RENTALS
              </span>
            </h2>
            <p className="text text-center">Login to your account</p>

            {/* Login Form */}
            <div className="form-container justify-center max-w-187.5 self-center">
              <form className="form" onSubmit={handleAddCar}>
                {/* Car Model */}
                <div className="form-control half">
                  <label htmlFor="carModel" className="label">
                    Car Model
                  </label>
                  <input
                    type="text"
                    name="carModel"
                    id="carModel"
                    className="input-field"
                    placeholder="e.g. Toyota Camry 2023"
                    required
                  />
                </div>
                {/* Daily Rental Price */}
                <div className="form-control half">
                  <label htmlFor="dailyRentalPrice " className="label">
                    Daily Rental Price (৳)
                  </label>
                  <input
                    type="number"
                    name="dailyRentalPrice"
                    id="dailyRentalPrice"
                    className="input-field"
                    placeholder="e.g. 500"
                    required
                  />
                </div>
                {/* Location */}
                <div className="form-control half">
                  <label htmlFor="location" className="label">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="input-field"
                    placeholder="e.g. Rampura, Dhaka"
                    required
                  />
                </div>
                {/* Vehicle Registration No */}
                <div className="form-control half">
                  <label htmlFor="vehicleRegistration" className="label">
                    Vehicle Registration No
                  </label>
                  <input
                    type="text"
                    name="vehicleRegistration"
                    id="vehicleRegistration"
                    className="input-field"
                    placeholder="e.g. DHA-1234"
                    required
                  />
                </div>
                {/* Availability */}
                <div className="form-control half">
                  <label htmlFor="availability" className="label">
                    Availability
                  </label>
                  <select
                    name="availability"
                    id="availability"
                    className="input-field"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select availability
                    </option>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>
                {/* Image URL */}
                <div className="form-control half">
                  <label htmlFor="imageURL" className="label">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="imageURL"
                    id="imageURL"
                    className="input-field"
                    placeholder="e.g. png, jpg"
                    required
                  />
                </div>
                {/* Features */}
                <div className="form-control">
                  <label htmlFor="features" className="label">
                    Features
                  </label>
                  <input
                    type="text"
                    name="features"
                    id="features"
                    className="input-field"
                    placeholder="e.g. GPS, AC, Sunroof"
                    required
                  />
                </div>
                {/* Description*/}
                <div className="form-control">
                  <label htmlFor="description" className="label">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="input-field"
                    placeholder="Describe the car..."
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-primary w-full cursor-pointer mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinnerSm></LoadingSpinnerSm>
                    </>
                  ) : (
                    <>Add Car</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
