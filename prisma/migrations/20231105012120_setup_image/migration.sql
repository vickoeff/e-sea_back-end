-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "fieldname" TEXT NOT NULL,
    "originalname" TEXT NOT NULL,
    "encoding" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
