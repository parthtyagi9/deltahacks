import { Card, CardDescription, CardTitle } from "../ui/card";

export default function Features() {
  return (
    <section className="-mt-12 w-full max-w-7xl mx-auto">
      <h2>Features</h2>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardTitle className="lg:text-2xl">Feature {index + 1}</CardTitle>
            <CardDescription className="lg:text-lg">
              This is a description for feature {index + 1}. It highlights the
              key benefits and functionalities of this feature.
            </CardDescription>
          </Card>
        ))}
      </div>
    </section>
  );
}
