const OperatorRegistry = require("./operator-registry");

// Basic
const ReadImage = require("../operator/basic/ReadImage");
const WriteImage = require("../operator/basic/WriteImage");

// Geometric
const ReflectImage = require("../operator/geometric/ReflectImage");
const RotateImage = require("../operator/geometric/RotateImage");
const AffineImage = require("../operator/geometric/AffineImage");
const ScaleImage = require("../operator/geometric/ScaleImage");

// Conversions
const GrayImage = require("../operator/conversions/GrayImage");
const GrayToBinary = require("../operator/conversions/GrayToBinary");

// Drawing
const DrawLine = require("../operator/drawing/DrawLine");
const DrawEllipse = require("../operator/drawing/DrawEllipse");
const DrawArrowLine = require("../operator/drawing/DrawArrowLine");
const DrawText = require("../operator/drawing/DrawText");
const DrawCircle = require("../operator/drawing/DrawCircle");
const DrawRectangle = require("../operator/drawing/DrawRectangle");

// Blurring
const Blur = require("../operator/blurring/Blur");
const GaussianBlur = require("../operator/blurring/GaussianBlur");
const MedianBlur = require("../operator/blurring/MedianBlur");

// Filtering
const BilateralFilter = require("../operator/filtering/BilateralFilter");
const BoxFilter = require("../operator/filtering/BoxFilter");
const PyramidUp = require("../operator/filtering/PyramidUp");
const PyramidDown = require("../operator/filtering/PyramidDown");
const Erosion = require("../operator/filtering/Erosion");
const Dilation = require("../operator/filtering/Dilation");
const Morphological = require("../operator/filtering/Morphological");

// Thresholding
const AdaptiveThreshold = require("../operator/thresholding/AdaptiveThresholding");
const ApplyThreshold = require("../operator/thresholding/ApplyThreshold");

// Register all operators
OperatorRegistry.register("basic_readimage", "READIMAGE", ReadImage);
OperatorRegistry.register("basic_writeimage", "WRITEIMAGE", WriteImage);
OperatorRegistry.register("geometric_reflectimage", "REFLECTIMAGE", ReflectImage);
OperatorRegistry.register("geometric_rotateimage", "ROTATEIMAGE", RotateImage);
OperatorRegistry.register("geometric_affineimage", "AFFINEIMAGE", AffineImage);
OperatorRegistry.register("geometric_scaleimage", "SCALEIMAGE", ScaleImage);
OperatorRegistry.register("imageconvertions_grayimage", "GRAYIMAGE", GrayImage);
OperatorRegistry.register("imageconvertions_graytobinary", "GRAYTOBINARY", GrayToBinary);
OperatorRegistry.register("drawingoperations_drawline", "DRAWLINE", DrawLine);
OperatorRegistry.register("drawingoperations_drawellipse", "DRAWELLIPSE", DrawEllipse);
OperatorRegistry.register("drawingoperations_drawarrowline", "DRAWARROWLINE", DrawArrowLine);
OperatorRegistry.register("drawingoperations_drawtext", "DRAWTEXT", DrawText);
OperatorRegistry.register("drawingoperations_drawcircle", "DRAWCIRCLE", DrawCircle);
OperatorRegistry.register("drawingoperations_drawrectangle", "DRAWRECTANGLE", DrawRectangle);
OperatorRegistry.register("blurring_applyblur", "BLURIMAGE", Blur);
OperatorRegistry.register("blurring_applygaussianblur", "GAUSSIANBLUR", GaussianBlur);
OperatorRegistry.register("blurring_applymedianblur", "MEDIANBLUR", MedianBlur);
OperatorRegistry.register("filtering_bilateral", "BILATERALFILTER", BilateralFilter);
OperatorRegistry.register("filtering_boxfilter", "BOXFILTER", BoxFilter);
OperatorRegistry.register("filtering_pyramidup", "PYRAMIDUP", PyramidUp);
OperatorRegistry.register("filtering_pyramiddown", "PYRAMIDDOWN", PyramidDown);
OperatorRegistry.register("filtering_erosion", "EROSION", Erosion);
OperatorRegistry.register("filtering_dilation", "DILATION", Dilation);
OperatorRegistry.register("filtering_morphological", "MORPHOLOGICAL", Morphological);
OperatorRegistry.register("thresholding_adaptivethreshold", "ADAPTIVETHRESHOLDING", AdaptiveThreshold);
OperatorRegistry.register("thresholding_applythreshold", "SIMPLETHRESHOLDING", ApplyThreshold);

const PROCESS_OPERATIONS = OperatorRegistry.getOperationConstants();

module.exports = PROCESS_OPERATIONS;
